export default function handler(req, res) {
    const body = req.body
    console.log('body: ', body)

    if (!body.firstName || !body.lastName || !body.email || !body.phoneNumber || !body.arrival || !body.departure || !body.amount) {
        return (
            res.status(400).json({
                data: 'Please fill out form'
            })
        )
    }
    res.status(200).json({
        data: `Form submitted`
    })
}