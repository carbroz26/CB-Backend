export class LoginBuilder {
    build() {
        return {
            templateType: "auth_login",
            properties: {
                title: "Login to CarBroz",
            },
            components: [
                {
                    type: "PHONE_INPUT",
                    properties: {
                        placeholder: "Enter mobile number",
                    },
                    subcomponents: [],
                },
                {
                    type: "BUTTON",
                    properties: {
                        text: "Send OTP",
                        action: "SEND_OTP",
                    },
                    subcomponents: [],
                },
            ],
        };
    }
}
//# sourceMappingURL=LoginBuilder.js.map