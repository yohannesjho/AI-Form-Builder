export async function POST(req) {
    const { userInput } = await req.json();   
    const API_URL = "https://api-inference.huggingface.co/models/gpt2";  
    const TOKEN = "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";  

    const headers = {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    };

    
    const payload = {
        inputs: `Create a JSON object for a feedback form with the following fields: name, email, and message. Output only the JSON structure without any additional explanation or text.

        Example of the expected format:

        {
          "name": "string",
          "email": "string",
          "message": "string"
        }`,
        max_tokens: 150,   
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error("Error Response Body:", await response.text());
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json(); 
        console.log("Result:", result);

        
        const generatedText = result[0]?.generated_text || 'No form structure generated';
        
        return new Response(JSON.stringify({ generatedText }), { status: 200 });
    } catch (error) {
        console.error("Error communicating with Hugging Face API:", error);
        return new Response(
            JSON.stringify({ error: "Failed to generate form structure." }),
            { status: 500 }
        );
    }
}
