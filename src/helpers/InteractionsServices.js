

export const resumeInteraction = async (conversationSid) => {
    //MY REFERENCE ONLY -> 
    console.log('#### resumeInteraction called ... flexInteractionSid = ', conversationSid);
    try {
        const response = await fetch('https://serverless-park-an-interaction-1028-dev.twil.io/unpark-an-interaction', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                ConversationSid : conversationSid
            })
        })
        //console.log(await response.json())
        return await response.json();
        
    } catch (error) {
        console.log('##### Error ', error);
        return error;
    }

}



