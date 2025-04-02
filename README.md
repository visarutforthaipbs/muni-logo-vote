# 🏛️ Municipal Logo Vote

เว็บไซต์สำหรับโหวตโลโก้เทศบาลทั่วประเทศไทย เพื่อให้ผู้คนรู้จักเทศบาลของตนเองมากขึ้นในช่วงใกล้เลือกตั้งเทศบาลปี 2568

## 🚀 Features

- 🔍 ค้นหาเทศบาลด้วยชื่อ, อำเภอ, หรือจังหวัด
- 🎨 แสดงโลโก้เทศบาลจาก GitHub repository
- 📊 แสดงสถิติการโหวตแบบ real-time
- 📱 Responsive design รองรับทุกขนาดหน้าจอ
- 🌐 SEO optimized
- 🔄 Real-time updates ด้วย MongoDB

## 🛠️ Tech Stack

- Next.js 14
- TypeScript
- Chakra UI
- MongoDB
- Vercel (Deployment)

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
├── contexts/           # React contexts
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/visarutforthaipbs/muni-logo-vote.git
cd muni-logo-vote
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:

```env
MONGODB_URI=your_mongodb_uri
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your changes.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Data collection by "🥊 นักสู้ PDF" group
- Municipal logos from [GitHub repository](https://github.com/creatorsgarten/muni-logo)
- Special thanks to all contributors and supporters
