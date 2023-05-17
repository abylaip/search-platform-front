import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { Header } from "@components";

interface Content {
  name: string;
  field: string;
  location: string;
  employees: string;
  vacancy: string;
}

const DiplomasPage = () => {
  const [content, setContent] = useState<Content>({
    name: "",
    field: "",
    location: "",
    employees: "",
    vacancy: "",
  });
  useEffect(() => {
    console.log(Cookies.get("access_token"));
    const fetchAPI = async () => {
      const res = await fetch(`https://api.publicapis.org/entries`);
      console.log(res);
    };
    fetchAPI();
  }, []);
  return (
    <>
      <Header />
      <div className="px-32 py-5 flex flex-col space-y-5">
        <p className="text-gray-400 cursor-default">
          Главная страница /{" "}
          <span className="font-semibold text-accent">
            Поиск дипломных работ
          </span>
        </p>
        <div className="p-5 flex bg-white rounded-lg shadow-lg h-screen">
          <div className="flex-1 flex flex-col pr-2 border-r border-gray-300 overflow-y-scroll">
            {jobs.map((item, key) => (
              <JobsCard
                key={key}
                name={item.name}
                field={item.field}
                location={item.location}
                employees={item.employes}
                vacancy={item.vacancy}
                content={content}
                setContent={setContent}
              />
            ))}
          </div>
          <div
            className={`flex-1 px-5 ${
              content.vacancy ? "visible" : "invisible"
            } flex flex-col space-y-2 h-full overflow-y-scroll overflow-x-hidden max-w-full`}
          >
            <p className="text-xl font-bold">{content.name}</p>
            <p className="text-low-contrast">{content.location}</p>
            <label className="text-primary flex flex-row space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-low-contrast font-medium">
                {content.field}
              </span>
            </label>
            <label className="text-primary flex flex-row space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="text-low-contrast font-medium">
                {content.employees} employees
              </span>
            </label>
            <span className="">{content.vacancy}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const JobsCard = ({
  name,
  field,
  location,
  employees,
  vacancy,
  content,
  setContent,
}: {
  name: string;
  field: string;
  location: string;
  employees: string;
  vacancy: string;
  content: any;
  setContent: any;
}) => {
  return (
    <div
      onClick={() => {
        setContent({
          name: name,
          field: field,
          location: location,
          employees: employees,
          vacancy: vacancy,
        });
      }}
      className={`flex flex-row items-center space-x-5 border-b border-gray-300 px-2 py-4 ${
        name === content.name ? "bg-blue-100" : "bg-white"
      } cursor-pointer`}
    >
      <Image
        src="/static/placeholder.png"
        width={70}
        height={70}
        className="rounded-full object-cover w-16 h-16"
        alt=""
      />
      <div>
        <p className="font-semibold text-accent text-lg">{name}</p>
        <p className="text-gray-500">{field}</p>
        <p className="text-gray-500">{location}</p>
      </div>
    </div>
  );
};

const jobs = [
  {
    name: "EPAM",
    field: "IT Services and IT Consulting",
    location: "Newtown, PA",
    employes: "58824",
    vacancy:
      "Develop new user-facing features using React.js \n Build reusable components and front-end libraries for future use Translate designs and wireframes into high quality code\n Optimize components for maximum performance across a vast array of web-capable devices and browsers\n Drive the architecture and technical implementation across the application\n Help maintain and develop new components of our design system",
  },
  {
    name: "KPMG",
    field: "Accounting",
    location: "Toronto, ON",
    employes: "236000",
    vacancy:
      "Develop new features for our Backstage and Webapp. Enhance our web user experience, streamline workflows, improve feedback and reporting. Perform complete UI/UX re-design with ease of use, contextual aid in mind.  Work in cross-team projects on new & improving existing features. Participate in brainstorming, specification, and design sessions.  Work hand in hand with our Product designers to produce best in class UI and UX. Maintain documentation, samples & best practices up to the highest standards",
  },
  {
    name: "Appen",
    field: "IT Services and IT Consulting",
    location: "Sydney",
    employes: "1125",
    vacancy:
      "· Strong/ stable internet connection · Strong attention to detail · Excellent comprehension skills in English · Ability to review examples and apply rules to data  · Familiarity with spelling conventions in Germany  · Strong spoken and written fluency of German",
  },
  {
    name: "Dice",
    field: "Internet Publishing",
    location: "Centennial, Colorado",
    employes: "2531",
    vacancy:
      "Leverage the inbuilt React toolkit for creating frontend features Create data visualization tools, libraries, and reusable code for prospects Integrate designs and wireframes within the application code Monitor interaction of users and convert them into insightful information Write application interface code with JavaScript Enhance application performance with constant monitoring Translate wireframes and designs into good quality code Optimize components to work seamlessly across different browsers and devices Good understanding of CSS libraries, GIT, Sigma, Adobe XD etc. Proper user information authentication Develop responsive web-based UI",
  },
  {
    name: "Atomic",
    field: "Venture Capital and Private Equity Principals",
    location: "Miami, Florida",
    employes: "750",
    vacancy:
      "Contribute to the development of a new mobile application Understand key user needs and propose and implement solutions Build delightful user experiences Work closely with engineering, product, and design teams",
  },
  {
    name: "CoverGo | Insurtech",
    field: "Insurance",
    location: "Singapore",
    employes: "243",
    vacancy:
      "As a Frontend Engineer you'll work on core product features of the CoverGo platform Work on challenging frontend problems in multi-tenant and cloud-agnostic architectures Crafting no-code editors, tools and visual rules engines Fully own features from ideation with design and product, to working on iterations and improvements Improving and refactoring our current codebases Evaluating new technologies for the platform Building relationships with engineers across all product teams in CoverGo",
  },
  {
    name: "Binance",
    field: "Internet Publishing",
    location: "Everywhere",
    employes: "4425",
    vacancy:
      "5+ years of experience with full lifecycle of project development for Java Applications. Strong skills in Core Java, server-side Java technologies, and Spring frameworks. Extensive experience in software design, architecture, development integration. Solid knowledge of event processing models, multi-threading, enterprise integration pattern, Web Service and REST.Ability to supervise and mentor junior developers on the team. Experience creating React-based UIs.",
  },
  {
    name: "Cella",
    field: "Staffing and Recruiting",
    location: "Rockville, MD",
    employes: "545",
    vacancy:
      "Creates end-to-end product experience across Web, Mobile, Email that drive business objectives. Creates visually beautiful, compelling user interface and experience. Delivers user-friendly and experientially compelling product that delights users Ability and drive to solve complex problems Partners with research team to facilitate various user research tests Presents work to different stakeholders and leadership for review and feedback. Has excellent written and spoken communication skills Effectively uses established Design System standards and contributes to it.",
  },
];

export default DiplomasPage;
