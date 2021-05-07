
//create an api that accept telegram bot id and chat id to send message to telegram from an app, website.
//api will be able to js 
//api will have three messaging phases 
//api will be hosted so that user can connect to it 

class TeleUpdater {
    constructor() {
        this.phrase = {
            basic: function (msg) {
                return msg
            },
            order: function (site, user, order) {
                const { name, id } = user
                const { productName, numberOrder } = order
                return `${name} with ID: ${id}, have make an Order to buy ${numberOrder} ${productName} on ${site}.`
            },

            email: function (site, user) {
                const { name, email } = user
                return `New Subcriber from ${site} details follows as Name: ${name},  email: ${email}.`
            }
        }
    }

    init(botId, chatId, site) {
        //user choice the type the want
        //user provide bot id and chat id 
        this.bot = botId
        this.chat = chatId
        this.site = site
        console.log('Coonect')
    }

    basicUpdate(msg) {
        let message = this.phrase.basic(msg)
        this.engine(message)
    }

    orderUpdate(user, orderDetails) {
        let message = this.phrase.order(this.site, user, orderDetails)
        this.engine(message)
    }

    emailUpdate(user) {
        let message = this.phrase.email(this.site, user)
        this.engine(message)
    }

    engine(message) {
        let endpoint = `https://api.telegram.org/${this.bot}/sendMessage?chat_id=${this.chat}&text=${message}`

        fetch(endpoint).then(res => res.json()).then(data => {
            if (data.ok) return {
                sent: data.result.chat.title,
                time: data.result.date
            }
        })

    }
}



console.log("TeleUpdater 0.1.1")