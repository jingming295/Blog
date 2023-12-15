import { UserData } from "../Navigation Bar/interface";

/**
 * 发送post的class
 */
export class SendPost
{

    postWithUrlParams(api: string, params: Record<string, string | number | UserData>)
    {
        const url = `http://localhost:3000/${api}`;
    
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
            .then(response =>
            {
                if (!response.ok)
                {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseText => responseText)
            .catch(error =>
            {
                console.error('Error:', error);
                throw new Error('Backend Not Running');
            });
    }
    


}
