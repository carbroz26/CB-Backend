export declare class OtpBuilder {
    build(): {
        templateType: string;
        properties: {
            title: string;
        };
        components: ({
            type: string;
            properties: {
                length: number;
                text?: undefined;
                action?: undefined;
            };
            subcomponents: never[];
        } | {
            type: string;
            properties: {
                text: string;
                action: string;
                length?: undefined;
            };
            subcomponents: never[];
        })[];
    };
}
