/**
 * Test Google Generative AI connection
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Your API key
const API_KEY = 'AIzaSyB6R-SNmKTGTkD640Pb37Uqd1O2QzeVmRU';

async function testGenAI() {
  try {
    console.log('Testing Google Generative AI connection...');

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = 'Describe what an assembly instruction diagram for attaching side panels to a bookcase would look like.';

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('\n✅ GenAI API is working!');
    console.log('\nResponse:', text);

  } catch (error) {
    console.error('❌ Error connecting to GenAI:', error.message);
    if (error.message.includes('API_KEY')) {
      console.log('Check your API key configuration');
    }
  }
}

testGenAI();