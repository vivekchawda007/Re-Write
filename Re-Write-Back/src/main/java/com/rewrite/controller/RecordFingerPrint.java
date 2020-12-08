package com.rewrite.controller;

import java.awt.image.BufferedImage;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

import SecuGen.FDxSDKPro.jni.JSGFPLib;
import SecuGen.FDxSDKPro.jni.SGDeviceInfoParam;
import SecuGen.FDxSDKPro.jni.SGFDxDeviceName;
import SecuGen.FDxSDKPro.jni.SGFDxErrorCode;
import SecuGen.FDxSDKPro.jni.SGFingerInfo;
import SecuGen.FDxSDKPro.jni.SGFingerPosition;
import SecuGen.FDxSDKPro.jni.SGImpressionType;
import SecuGen.FDxSDKPro.jni.SGPPPortAddr;

public class RecordFingerPrint {

	public static void main(String args []) throws FileNotFoundException {
		returnCapturedFingerImage();
	}
    private static javax.swing.JLabel jLabelImage;

    public static JSGFPLib sgfplib = null;
    public static long err;
    public static SGDeviceInfoParam deviceInfo;

    public static byte[] SG400minutiaeBuffer1=null;
    public static byte[] SG400minutiaeBuffer2=null;

    public static void writeImage(byte[][] img) {
        //write your realtime image for testing
        String path = "D:\\testimg1.png";
        BufferedImage image = new BufferedImage(img.length, img[0].length, BufferedImage.TYPE_BYTE_GRAY);
        for (int x = 0; x < img.length; x++) {
            for (int y = 0; y <img[0].length; y++) {
                image.setRGB(x, y, img[x][y]);
            }
        }

        File ImageFile = new File(path);
        try {
            ImageIO.write(image, "png", ImageFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static byte[] returnCapturedFingerImage() throws FileNotFoundException {
        byte[] imageBuffer1 = null;

        /* initialize the secugen bluetooth device */
        try
        {
             sgfplib = new JSGFPLib();


             if ((sgfplib != null) && (sgfplib.jniLoadStatus != SGFDxErrorCode.SGFDX_ERROR_JNI_DLLLOAD_FAILED))
                {
                    System.out.println(sgfplib);
                }
                else
                {
                    System.out.println("An error occurred while loading JSGFPLIB.DLL JNI Wrapper");
                 //   return false;
                }       


                // Init()
                System.out.println("Call Init(SGFDxDeviceName.SG_DEV_AUTO)");
                err = sgfplib.Init(SGFDxDeviceName.SG_DEV_AUTO);
                System.out.println("Init returned : [" + err + "]");




                // **************OpenDevice()
                System.out.println("Call OpenDevice(SGPPPortAddr.AUTO_DETECT)");
                err = sgfplib.OpenDevice(SGPPPortAddr.AUTO_DETECT);
                System.out.println("OpenDevice returned : [" + err + "]");

             // GetError()
                System.out.println("Call GetLastError()");
                err = sgfplib.GetLastError();
                System.out.println("GetLastError returned : [" + err + "]");

                // GetDeviceInfo()
                //System.out.println("Call GetDeviceInfo()");
                deviceInfo = new SGDeviceInfoParam();
                err = sgfplib.GetDeviceInfo(deviceInfo);
                //System.out.println( "GetDeviceInfo returned : [" + err + "]");

                System.out.println("\tdeviceInfo.DeviceSN:    [" + new String(deviceInfo.deviceSN()) + "]");
                System.out.println("\tdeviceInfo.Brightness:  [" + deviceInfo.brightness + "]");
                System.out.println("\tdeviceInfo.ComPort:     [" + deviceInfo.comPort + "]");
                System.out.println("\tdeviceInfo.ComSpeed:    [" + deviceInfo.comSpeed + "]");
                System.out.println("\tdeviceInfo.Contrast:    [" + deviceInfo.contrast + "]");
                System.out.println("\tdeviceInfo.DeviceID:    [" + deviceInfo.deviceID + "]");
                System.out.println("\tdeviceInfo.FWVersion:   [" + deviceInfo.FWVersion + "]");
                System.out.println("\tdeviceInfo.Gain:        [" + deviceInfo.gain + "]");
                System.out.println("\tdeviceInfo.ImageDPI:    [" + deviceInfo.imageDPI + "]");
                System.out.println("\tdeviceInfo.ImageHeight: [" + deviceInfo.imageHeight + "]");
                System.out.println("\tdeviceInfo.ImageWidth:  [" + deviceInfo.imageWidth + "]"); 
        }
        catch (Exception e)
        {
            System.out.println("Exception reading FP reader : " + e);
        }

        //get finger print data captured 
        /*****************************************************************************/

        byte[] buffer = new byte[deviceInfo.imageWidth*deviceInfo.imageHeight];
        long timeout = 10000;
        long quality = 80;
        if(sgfplib.GetImageEx(buffer, timeout, 1, quality) ==SGFDxErrorCode.SGFDX_ERROR_NONE)
        {

            /*image code*/
             javax.swing.JLabel jLabelRegisterImage1 = new javax.swing.JLabel();


            /*image code test end*/

            PrintStream fp = null;
            int[] img_qlty = new int[1];;
            err = sgfplib.GetImageQuality(deviceInfo.imageHeight, deviceInfo.imageWidth, buffer, img_qlty);


            byte[][] buffer2D = new byte[deviceInfo.imageHeight][deviceInfo.imageWidth];


            System.out.println("********************");
            for(int i=0;i<deviceInfo.imageHeight;i++) {
                for(int j=0;j<deviceInfo.imageWidth;j++) {
                    buffer2D[i][j]=buffer[i*deviceInfo.imageWidth+j];
                    System.out.print(buffer2D[i][j]+" ,");
                    //System.out.println(i+" ,"+j+" "+(i*deviceInfo.imageWidth+j));
                }
                System.out.println();
            }

            System.out.println("********************");
            writeImage(buffer2D);




            System.out.println("Buffer Length:"+buffer.length);
            //System.out.println("Buffer array:"+Arrays.toString(buffer));

            System.out.println("GetImageQuality returned : [" + err + "]");
            System.out.println("Image Quality is : [" + img_qlty[0] + "]");
            FileOutputStream fout = null;
            fp = new PrintStream(fout);
            fp.write(buffer,0, buffer.length);
            fp.close();
            try {
                fout.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            fp = null;
            fout = null;

        }

        return null;

    }


}