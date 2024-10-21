'use strict';

module.exports = () => {
    class OTPRequest {
        constructor(otp){
            this.otp = otp;
        }
    }
    return OTPRequest;
}