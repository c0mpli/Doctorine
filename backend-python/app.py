import os
from os import path, walk
from flask import Flask, request
from werkzeug.utils import secure_filename
from yolov7.setup import inference
import os.path
from flask_cors import CORS, cross_origin
import cv2

import pandas as pd
# import joblib
# from sklearn.preprocessing import StandardScaler,RobustScaler,MinMaxScaler
# import scipy.stats as stat
# import pylab
# from preprocessing import scale_test_point 

pd.pandas.set_option('display.max_columns',None)

os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'

IMG_HEIGHT = 32
IMG_WIDTH = 32

channels = 3
UPLOAD_FOLDER = './static/uploads'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}  # Set the allowed file extensions

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
	
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
cors = CORS(app, origins=['https://doctorine-node.onrender.com'])
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/predict', methods = ['POST'])
@cross_origin()
def upload_image():
    if len(request.files) ==0:
        return "File empty", 400
    file = request.files['file']
    if file.filename == '':
        return "No image selected for uploading", 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        pred=inference(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        sbp=0
        hr=0
        rr=0
        if 'HR' in pred:
            hr = int(pred['HR'])
        if 'RR' in pred:
            rr = int(pred['RR'])
        if 'SBP' in pred:
            sbp=int(pred['SBP'])
        alert=""
        cause=[]
        if(hr!=0 and rr!=0):
            if 60<=hr<=100 and 10<=rr<=20:
                alert+="Safe"
            elif (50<=hr<60 or 100<hr<=110) or  (8<=rr<10 or 20<rr<=24):
                alert+="Warning"
                if(50<=hr<60 or 100<hr<=110):
                    cause.append("HR")
                if(8<=rr<10 or 20<rr<=24):
                    cause.append("RR")
            else:
                alert+="Danger"
                if(hr<40 or hr>120):
                    cause.append("HR")
                if(rr<8 or rr>24):
                    cause.append("RR")

        res = {
            "HR": hr,
            "RR": rr,
            "SBP": sbp,
            "alert": alert,
            "cause": cause
        }
        print(res)
        return res, 201
    else:
        return "Invalid file extension. Only JPG, JPEG, PNG, and GIF are allowed.", 400



# @app.route('/predict_hdp/', methods=['GET','POST'])
# def predict():
    if request.method == "POST":
        #get form data
        age = request.form.get('age')
        sex = request.form.get('sex')
        chest_pain = request.form.get('chest_pain')
        trestbps = request.form.get('trestbps')
        chol = request.form.get('chol')
        fbs = request.form.get('fbs')
        restecg = request.form.get('restecg')
        thalach = request.form.get('thalach')
        exang = request.form.get('exang')
        oldpeak = request.form.get('oldpeak')
        slope = request.form.get('slope')
        ca = request.form.get('ca')
        thal = request.form.get('thal')

        print('age : ',age)
        print('sex : ',sex)
        print('chest_pain : ',chest_pain)
        print('trestbps : ',trestbps)
        print('chol : ',chol)
        print('fbs : ',fbs)
        print('restecg : ',restecg)
        print('thalach : ',thalach)
        print('exang : ',exang)
        print('oldpeak : ',oldpeak)
        print('slope : ',slope)
        print('ca : ',ca)
        print('thal : ',thal)

        if sex.lower()=='m':
            sex=1
        else:
            sex=0

        test_point=[float(age),float(sex),float(chest_pain),float(trestbps),float(chol),float(fbs),float(restecg),float(thalach),float(exang),float(oldpeak),float(slope),float(ca),float(thal)]

        print(test_point)

        prediction=scale_test_point(test_point)
        print(prediction)
        if(prediction[0]==0):
            return render_template('predict_hdp.html',
                                    main_heading='You are Healthy',
                                    sub_heading="Please Note that the results are based upon Artificial Intelligence",
                                    go_back=True
                                   )
        else:
            return render_template('predict_hdp.html',
                                    main_heading='We Recommend you to Consult a Doctor',
                                    sub_heading="There's a high chance that you are diagnosed with a heart Disease. We Suggest you to consult a doctor to make sure of your Health Condition. Please Note that the results are based upon Artificial Intelligence",
                                    go_back=False
                                    )


import cv2
@app.route('/extract', methods = ['POST'])
def extract_frames():
    # Open the video file
    video_path = request.video_path
    output_folder = request.output_folder
    video = cv2.VideoCapture(video_path)

    # Check if video file is opened successfully
    if not video.isOpened():
        print("Error opening video file")
        return

    # Create the output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    frame_count = 0

    # Read frames from the video
    while True:
        # Read the next frame
        success, frame = video.read()

        if not success:
            # End of video
            break

        # Save the frame as an image file
        output_path = os.path.join(output_folder, f"frame_{frame_count}.jpg")
        cv2.imwrite(output_path, frame)

        frame_count += 1

    # Release the video file
    video.release()

    print(f"Extracted {frame_count} frames")


extra_dirs = ['./static/styles','./static/js','./templates']
extra_files = extra_dirs[:]
for extra_dir in extra_dirs:
    for dirname, dirs, files in walk(extra_dir):
        for filename in files:
            filename = path.join(dirname, filename)
            if path.isfile(filename):
                extra_files.append(filename)

if __name__ == '__main__':
    app.run(debug=True,extra_files=extra_files)