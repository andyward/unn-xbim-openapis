export const Config: IConfig = {
    tenantId: "openapi-demo",
    region: "Sandbox",
    token: "IfnHA4HdZjwfCTXQJL51Ue1mhpcNJkaE25a31unUmVc",
}

interface IConfig {
    tenantId: string,
    region: "UK" | "WestEurope" | "Sandbox" | "Fx003" | undefined;
    token: string
}