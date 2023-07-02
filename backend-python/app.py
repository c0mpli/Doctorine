import os
from os import path, walk
from flask import Flask, request
from werkzeug.utils import secure_filename
from yolov7.setup import inference
import os.path

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


@app.route('/predict/', methods = ['POST'])
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
        return pred, 201
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