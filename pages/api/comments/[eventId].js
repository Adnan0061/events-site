export default function handler(req, res){
    const eventId = req.query.eventId;

    if( req.method === "POST"){
        const { email, name, comment } = req.body;
        if(!email.includes('@') || !name || !name.trim() === '' || !text || !text.trim() === ''){
            res.status(422).json({message: 'invalid input'})
            return;
        }
        const newComment = {
            id: new Date().toISOString(),
            email,
            name,
            text,
        }
        console.log(newComment);
        res.status(201).json({ message: 'Added Comment.'})
    }

    if( req.method === "GET"){
        const dummyList = [
            {id: 'c1', name: 'Max', text: 'A first comment'},
            {id: 'c2', name: 'Man', text: 'A first comment'},
        ];        

        res.status(200).json({ comments: dummyList })
    }
}