from agents import Agent, Runner
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set your OpenAI API key
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY", "")

def create_weather_agent():
    """
    Create an OpenAI agent using the Agents SDK that can answer weather questions
    """
    # Create an agent with instructions about weather
    weather_agent = Agent(
        name="Weather Agent",
        instructions="You are a helpful weather assistant. Answer questions about weather in cities. If you don't have real-time weather data, explain that you can't provide current weather but can provide general information about typical weather in that area.",
        model="gpt-4o-mini"
    )
    
    # Run the agent with a query about Islamabad's weather
    result = Runner.run_sync(
        weather_agent,
        "What is the weather in Islamabad?"
    )
    
    print("Agent Response:")
    print(result.final_output)

if __name__ == "__main__":
    create_weather_agent()