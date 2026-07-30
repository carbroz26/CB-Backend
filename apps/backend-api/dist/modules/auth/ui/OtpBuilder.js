export class OtpBuilder {
    build() {
        return {
            templateType: "auth_otp",
            properties: {
                title: "Verify OTP",
            },
            components: [
                {
                    type: "OTP_INPUT",
                    properties: {
                        length: 6,
                    },
                    subcomponents: [],
                },
                {
                    type: "BUTTON",
                    properties: {
                        text: "Verify",
                        action: "VERIFY_OTP",
                    },
                    subcomponents: [],
                },
            ],
        };
    }
}
//# sourceMappingURL=OtpBuilder.js.map