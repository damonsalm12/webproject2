from collections import deque
# The channel object represents a single channel in the application.
# It stores the name of the channel as well as the messages it contains in a list
class Channel:
    # Assign a value to the name attribute and initialize the queue of messages
    def __init__(self, name):
        self.name = name
        self.messages = deque([])
    
    # Add a message to the list, treating it as a queue
    def addmessage(self, message):
        # Ensure message is a string and add to queue
        self.messages.append(str(message))
        # Remove a message if it is too long
        if len(self.messages) > 100:
           self.messages.popleft()
    
    # Get the deque of messages as a list
    def getlist(self):
        return list(self.messages)
