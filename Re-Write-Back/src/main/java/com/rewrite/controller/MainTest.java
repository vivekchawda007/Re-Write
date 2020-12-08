package com.rewrite.controller;

import SecuGen.FDxSDKPro.jni.JSGFPLib;
import SecuGen.FDxSDKPro.jni.SGDeviceInfoParam;
import SecuGen.FDxSDKPro.jni.SGFDxDeviceName;
import SecuGen.FDxSDKPro.jni.SGFDxErrorCode;
import SecuGen.FDxSDKPro.jni.SGPPPortAddr;

public class MainTest {

	public static void main(String args[]) {
		JSGFPLib sgfplib = new JSGFPLib();
        if ((sgfplib != null) && (sgfplib.jniLoadStatus != SGFDxErrorCode.SGFDX_ERROR_JNI_DLLLOAD_FAILED))
        {
            System.out.println(sgfplib);
        }
        else
        {
            System.out.println("An error occurred while loading JSGFPLIB.DLL JNI Wrapper");
            return;
        }

        ///////////////////////////////////////////////
        // Init()
        System.out.println("Call Init(SGFDxDeviceName.SG_DEV_AUTO)");
        long err = sgfplib.Init(SGFDxDeviceName.SG_DEV_FDU03);
        err = sgfplib.OpenDevice(SGPPPortAddr.USB_AUTO_DETECT);
        SGDeviceInfoParam deviceInfo = new SGDeviceInfoParam();
        err = sgfplib.GetDeviceInfo(deviceInfo);

        System.out.println(err);
	}
}
