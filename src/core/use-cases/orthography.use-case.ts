import { OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async (prompt: string) => {

    try {

        const url=import.meta.env.VITE_GPT_URL+'/orthography-check';

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });


        if (!resp.ok) throw new Error("Error no se pudo realizar la corrección");

        const data = await resp.json() as OrthographyResponse;

        return {
            ok: true,
            ...data
        }

    }
    catch (error) {
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: "no se pudo completar la operación"
        }
    }

}