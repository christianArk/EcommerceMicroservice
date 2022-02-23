export class Utils {
    generateToken = (len) => {
        let token = []
        for(let i = 0; i < len; i++) {
            token.push(Math.floor(Math.random() * 10))
        }
        return token.join('')
    }
}