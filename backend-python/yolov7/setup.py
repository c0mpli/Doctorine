import cv2
import torch
import numpy as np
import re
import easyocr
import sys
sys.path.append('./')  # to run '$ python *.py' files in subdirectories


from .models.experimental import *
from .utils.general import check_img_size, non_max_suppression, \
    scale_coords, xyxy2xywh, strip_optimizer, set_logging, increment_path
from .utils.torch_utils import time_synchronized
from .utils.datasets import letterbox


# In[5]:


def detect(model, source):

    device = 'cpu'
    imgsz = 640
    img = source


    stride = int(model.stride.max())  # model stride
    imgsz = check_img_size(imgsz, s=stride)  # check img_size TODO

    names = model.module.names if hasattr(model, 'module') else model.names
    old_img_w = old_img_h = imgsz
    old_img_b = 1
    im0 = img

        # Convert
    img = letterbox(img, imgsz, stride=stride)[0]
    img = img[:, :, ::-1].transpose(2, 0, 1)  # BGR to RGB, to 3x416x416
    img = np.ascontiguousarray(img)


    img = torch.from_numpy(img).to(device)
    img = img.float()  # uint8 to fp16/32
    img /= 255.0  # 0 - 255 to 0.0 - 1.0
    if img.ndimension() == 3:
        img = img.unsqueeze(0)

    with torch.no_grad():   # Calculating gradients would cause a GPU memory leak
        pred = model(img)[0]
    # Apply NMS
    pred = non_max_suppression(pred, 0.25, 0.45, classes=[0,1,2,3,4,5])

    # Process detections
    outputs = []
    for i, det in enumerate(pred):  # detections per image

        if len(det):

            det[:, :4] = scale_coords(img.shape[2:], det[:, :4], im0.shape).round()

            for *xyxy, conf, cls in reversed(det):
                label = f'{names[int(cls)]}'
                out = [t.item() for t in xyxy]
                outputs.append((out, label, conf.item()))

    return outputs

def crop_image(out, img):
  x1 = int(out[0][0])
  x2 = int(out[0][2])
  y1 = int(out[0][1])
  y2 = int(out[0][3])
  # print(x1, x2, y1, y2)
  # Cropping an image
  cropped_image = img[y1:y2, x1:x2]

  return cropped_image


model1 = attempt_load(r'C:\\Users\\jashd\\Downloads\\Doctorine\\segmentation.pt')
model2 = attempt_load(r'C:\\Users\\jashd\\Downloads\\Doctorine\\classify.pt')
reader = easyocr.Reader(['en'])


import cv2

def inference(image_path: str):
    '''
    Function responsible for inference.
    Args: 
        image_path: str, path to image file. eg. "input/aveksha_micu_mon--209_2023_1_17_12_0_34.jpeg"
    Returns:
        result: dict, final output dictionary. eg. {"HR":"80", "SPO2":"98", "RR":"15", "SBP":"126", "DBP":"86"}
    '''
    result = {}
    img = cv2.imread(image_path)

    out1 = detect(model1, img)

    out1_img = crop_image(out1[0], img)
    cv2.imwrite("./outpic.jpeg", out1_img)

    out2 = detect(model2, out1_img)
    temp = {}

    for out in out2:
        out2_img = crop_image(out, out1_img)

        r = reader.readtext(out2_img)
        if not r:
            continue
        r = r[0]

        if r[2] < 0.2:
            continue

        tt = temp.get(out[1])
        if tt and tt['class_conf'] > out[2]:
            continue

        temp[out[1]] = {
            'class_conf': out[2],
            'value': re.sub("[^0-9]", "", r[1]),
            'value_conf': r[2]
        }

    #l = ['HR', 'SPO2', 'RR', 'SBP', 'DBP', 'MAP']
    l = ['HR','RR', 'SBP']

    for i in l:
        if not temp.get(i):
            continue

        result[i] = temp[i]['value']

    return result




from PIL import Image
import numpy as np

def temp1(image_path:str):
  '''
  Function responsible for inference.
  Args: 
    image_path: str, path to image file. eg. "input/aveksha_micu_mon--209_2023_1_17_12_0_34.jpeg"
  Returns:
    result: dict, final output dictionary. eg. {"HR":"80", "SPO2":"98", "RR":"15", "SBP":"126", "DBP":"86"}
  '''
  result = {}
  img = cv2.imread(image_path)
  
  out1 = detect(model1, img)
  out1_img = crop_image(out1[0], img)

  img = Image.fromarray(out1_img, 'RGB')
  img.save('my.png')
  img.show()
  
  out2 = detect(model2, out1_img)
  temp = {}
  
  for out in out2:
    out2_img = crop_image(out, out1_img)
    print(type(out2_img))
    img = Image.fromarray(out2_img, 'RGB')
    img.save('my.png')
    img.show()







