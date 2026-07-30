export declare class LoginBuilder {
    build(): {
        templateType: string;
        properties: {
            title: string;
        };
        components: ({
            type: string;
            properties: {
                placeholder: string;
                text?: undefined;
                action?: undefined;
            };
            subcomponents: never[];
        } | {
            type: string;
            properties: {
                text: string;
                action: string;
                placeholder?: undefined;
            };
            subcomponents: never[];
        })[];
    };
}
