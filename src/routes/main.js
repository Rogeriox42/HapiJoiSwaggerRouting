const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (req, header) => {
            console.log('Base Route!')
            return { message: `Successfully reached the '/' endpoint. ` }

        }
    }, 
    {
        method: 'GET', 
        path: '/anakin', 
        handler: (request, header) =>{
            console.log('Anakin Route!')
            return {
                name: 'Anakin', 
                title: 'Star Rider'
            }
        }
    }
]

module.exports = routes