import { AuthBindings } from "@refinedev/core";

import { API_URL, dataProvider } from "./data";

// For demo purposes and to make it easier to test the app, you can use the following credentials

export const authCredentials = {
     email: "micheal.scot@dundermiflin.com",
     password: "demodemo",
}

export const authProvider: AuthBindings = {
    login: async ({ email }) => {
        try{
            // call the login mutation
            // dataProvider.custom is used to make a custom request to the GraphQL API
            // this will call dataProvider which will go through the fetchWrapper function
            const { data } = await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables: { email },
                    // pass the email to see if the user exists if so, return the accessToken 
                    rawQuery: `
                    mutation login($email: String!) {
                        login(loginInput: { email: $email }) {
                            accessToken
                        }
                    }
                    `,
                },
            });

            // save the accessToken in localStorage
            localStorage.setItem("access_token", data.login.accessToken);

            return {
                success: true,
                redirectTo: "/",
            };
        } catch(e) {
            const error = e as Error;
        }
    },
}