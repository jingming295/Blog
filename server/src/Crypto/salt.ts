export class Salt
{
    generateSalt()
    {
        const length = 16;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()-_+=[{}]|\;:\'",./?<>\\s';
        let salt = '';
        for (let i = 0; i < length; i++)
        {
            salt += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log(salt)
        return salt;
    }
}