
import { User } from './user';
import { Volunteer } from './volunteer';

export class FingerPrintRequest {
    ErrorCode: number;
    Manufacturer: string
    Model: string
    SerialNumber: string
    ImageWidth: number
    ImageHeight: number
    ImageDPI: number
    ImageQuality: number
    NFIQ: number
    ImageDataBase64: string
    BMPBase64: string
    TemplateBase64: string
}