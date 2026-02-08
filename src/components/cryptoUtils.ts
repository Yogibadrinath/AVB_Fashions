import CryptoJS from "crypto-js";

const SECRET_PASS = 'XkhZG4fW2t2W';

export function DecryptData(data: string) {
    if (data) {
        const bytes = CryptoJS.AES.decrypt(data, SECRET_PASS);
        return bytes.toString(CryptoJS.enc.Utf8).replace(/"/g, ''); // Remove JSON quotes
    }
    return "";
}

export function EncryptData(data: any) {
    if (data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_PASS).toString();
    }
    return "";
}