import { users, emails, type User, type InsertUser, type Email, type InsertEmail } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEmail(email: InsertEmail): Promise<Email>;
  getEmails(): Promise<Email[]>;
  getEmailByAddress(email: string): Promise<Email | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private emails: Map<number, Email>;
  private userIdCounter: number;
  private emailIdCounter: number;

  constructor() {
    this.users = new Map();
    this.emails = new Map();
    this.userIdCounter = 1;
    this.emailIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEmail(insertEmail: InsertEmail): Promise<Email> {
    const id = this.emailIdCounter++;
    const email: Email = { 
      ...insertEmail, 
      id, 
      createdAt: new Date() 
    };
    this.emails.set(id, email);
    return email;
  }

  async getEmails(): Promise<Email[]> {
    return Array.from(this.emails.values());
  }

  async getEmailByAddress(emailAddress: string): Promise<Email | undefined> {
    return Array.from(this.emails.values()).find(
      (email) => email.email === emailAddress,
    );
  }
}

export const storage = new MemStorage();
