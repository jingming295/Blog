import urlconfig from "./config";
export class MailFormat
{

    RegisterMailFormat(toUser: string, token: string): string
    {
        const websiteName = 'Blog';
        const mailFormat = `<!DOCTYPE html>
        <html lang="zh-CN">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${websiteName}</title>
            <style>
                .backgroundDiv {
                    background-color: #f6f6f6;
                }
        
                .warpTable {
                    margin: auto;
                    border-collapse: collapse;
                }
        
                .contentWarp {
                    padding: 20px;
                }
        
                .contentTable {
                    border-collapse: collapse;
                }
        
                .mainContentTable {
                    width: 500px;
                    height: auto;
                    border: 1px solid #e4e4e4;
                    border-radius: 3px;
                    border-collapse: collapse;
                    font-family: Arial, Helvetica, sans-serif;
                }
        
                .titleTd {
                    width: 500px;
                    height: 20px;
                    background-image: linear-gradient(195deg, #73abff 0%, #16e6f8 100%);
                    text-align: center;
                }
        
                h3.title {
                    color: white;
                    font-weight: 500;
                    padding: 12px;
                    margin: 0;
                }
        
                .contentTd {
                    padding: 20px;
                    background-color: #fff;
                    font-weight: 400;
                    font-size: 15px;
                }
        
                .msgTd {
                    padding-bottom: 20px;
                }
        
                a.activation-link {
                    display: inline-block;
                    background-image: linear-gradient(195deg, #73abff 0%, #16e6f8 100%);
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 16px;
                    border-radius: 10px;
                    margin-top: 10px;
                    font-size: 14px;
                    letter-spacing: 1px;
                    margin-bottom: 20px;
                    transition: all 0.3s ease;;
                }
                a.activation-link:hover {
                    box-shadow:0 14px 26px -12px rgba(22, 192, 248, 0.4), 0 4px 23px rgba(22, 192, 248, 0.15), 0 8px 10px -5px rgba(22, 192, 248, 0.2);
                }
        
                .bottomMsgTable {
                    margin: 0;
                    width: 500px;
                    padding: 20px;
                }
        
                .bottomMsgTd {
                    text-align: center;
                    font-size: small;
                    color: gray;
                }
            </style>
        </head>
        
        <body>
            <div class="backgroundDiv">
                <table class="warpTable">
                    <tbody>
                        <tr>
                            <td>
                                <div class="contentWarp">
                                    <table class="contentTable">
                                        <tbody>
                                            <tr id="main">
                                                <td>
                                                    <table class="mainContentTable">
                                                        <tbody>
                                                            <tr>
                                                                <td class="titleTd">
                                                                    <h3 class="title">${websiteName}</h3>
                                                                </td>
                                                            </tr>
        
                                                            <tr>
                                                                <td class="contentTd">
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Dear <strong>${toUser}</strong></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="msgTd">
                                                                                    Thanks for registering ${websiteName},
                                                                                    please click below button to register.
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a class="activation-link"
                                                                                        href=${urlconfig.localFrontEndVerifyRegisterTokenUrl}${token}>Activate</a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>If you didn't register for ${websiteName},
                                                                                    please ignore this email</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td>
                                                    <div>
                                                        <table class="bottomMsgTable">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="bottomMsgTd">This email is generated by the
                                                                        system; kindly refrain from responding to it.</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>`;
        return mailFormat;
    }
}