import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/user/user.entity";
import { Blog } from "../entity/blogs/blogs.entity";
import { Certificate } from "../entity/certificate/certificate.entity";
import { Client } from "../entity/clients/clients.entity";
import { Contact } from "../entity/contact/contact.entity";
import { Advertise } from "../entity/advertise/advertise.entity";
import { GalleryItem } from "../entity/gallery/gallery.entity";
import { Job } from "../entity/jobs/jobs.entity";
import { NewsLetterSubscriber } from "../entity/news-letter/news-letter-subscriber.entity";
import { UserActivity } from "../entity/activity/user-activity.entity";
import { Service } from "../entity/service/service.entity";
import { Testimonial } from "../entity/testimonials/testimonials.entity";
import { envConfig } from "./env.config";
const { DB_URL } = envConfig

export const AppDataSource = new DataSource({
  type: "postgres",

  url: String(DB_URL),

  // ⚠️ REQUIRED for cloud DB (Neon / Render / Supabase)
  ssl: {
    rejectUnauthorized: false,
  },

  synchronize: true,
  logging: false,

  entities: [
    User,
    Blog,
    Advertise,
    Certificate,
    Client,
    Contact,
    GalleryItem,
    Job,
    NewsLetterSubscriber,
    UserActivity,
    Service,
    Testimonial,
  ],

  migrations: [],
  subscribers: [],
});