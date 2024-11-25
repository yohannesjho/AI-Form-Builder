
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    
      const  {description}  = await req.json(); // User's 1-2 sentence input
      

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Pass prompt to the model
    const prompt = `Create a JSON object for a form structure based on this description: "${description}". 
    only give me the json object has the form name and  fields Include field labels, types (e.g., text, email, checkbox), and placeholder values. and always include submit field type`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
   

    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("Valid JSON not found in the response.");
      }
      const jsonString = responseText.substring(jsonStart, jsonEnd);
      
      let formStructure;
      try {
          formStructure = JSON.parse(jsonString);
         
      } catch (err) {
        throw new Error("Extracted JSON is invalid.");
      }
     
    
    return new Response(JSON.stringify({ text: formStructure }), {
      status: 200,
      headers: { "Content-Type": "application/json","Access-Control-Allow-Origin": "*", },
    });
  } catch (error) {
    console.error("Error generating form:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate form structure." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
