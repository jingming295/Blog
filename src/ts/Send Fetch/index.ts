/**
 * 发送post的class
 */
export class SendPost
{

    postWithUrlParams(api: string, params: Record<string, string | number>)
    {
        const url = new URL(`http://localhost:3000/${api}`);

        // 将参数追加到 URL 上
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key].toString()));

        return fetch(url.toString(), {
            method: 'POST',
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
                throw new Error('Request failed');
            });
    }


}
