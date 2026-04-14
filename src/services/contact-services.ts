/* eslint-disable @typescript-eslint/no-explicit-any */
interface ContactData {
    name: string;
    email: string;
    message: string;
}

export async function sendEmail(data: ContactData) {
    try {
        const dataSend = {
            nombre: data.name,
            email: data.email,
            mensaje: data.message,
            destinatario: "opticamorea@gmail.com"
        };
        const response = await fetch("https://enddg-production.up.railway.app/enviar-email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dataSend)
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        return result;
    } catch (error: Error | any) {
        return { success: false, statusText: error.message };
    }
}