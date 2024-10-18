from dataclasses import dataclass
from datetime import datetime

@dataclass
class TransactionCreate():
    """
    Represents a transaction with additional information about number of notes, denomination and time

    Attributes:
        num_notes (int): Number of notes
        denomination (int): Denomination of the transaction
        time (datetime): Time of the transaction
        description (str): Description of the transaction
        direction (int): Direction of the transaction (1 for income, 2 for expense)
    """
    num_notes: int
    denomination: int
    time: datetime
    description: str
    direction: int

class Transaction(TransactionCreate):
    """
    Represents a transaction in the system, contains information about number of notes, denomination and time

    Attributes:
        id (int): Id of the transaction
    """
    id: int

@dataclass
class StatsCreate():
    """
    Represents a statistical record in the system, contains information about balance, total spent, total collected and time

    Attributes:
        balance (int): Balance of the wallet
        total_spent (int): Total spent of the wallet
        total_collected (int): Total collected of the wallet
        time (datetime): Time of the record
    """
    balance: int
    total_spent: int
    total_collected: int
    time: datetime


class Stats(StatsCreate):
    """
    Represents a statistical record in the system, contains information about balance, total spent, total collected and time

    Attributes:
        id (int): Id of the record
    """
    id: int

@dataclass
class Wallet:
    """
    Represents a wallet in the system, contains information about number of notes and denomination

    Attributes:
        five_hundred (int): Number of 500 notes
        two_hundred (int): Number of 200 notes
        hundred (int): Number of 100 notes
        fifty (int): Number of 50 notes
        twenty (int): Number of 20 notes / coins
        ten (int): Number of 10 notes / coins
        two (int): Number of 2 coins
        five (int): Number of 5 coins
        one (int): Number of 1 coins
    """
    five_hundred: int
    two_hundred: int
    hundred: int
    fifty: int
    twenty: int
    ten: int
    two: int
    five: int
    one: int

    def as_dict(self):
        return {
            "five_hundred": self.five_hundred,
            "two_hundred": self.two_hundred,
            "hundred": self.hundred,
            "fifty": self.fifty,
            "twenty": self.twenty,
            "ten": self.ten,
            "two": self.two,
            "five": self.five,
            "one": self.one
        }
