import configuration from "../config/app.json";

export class ConfigurationService {
    constructor() {
        this.settings = configuration.settings;
    }
}