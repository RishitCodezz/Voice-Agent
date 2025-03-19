import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  // Redirect to sign-in if not authenticated
  if (!user?.id) {
    redirect("/sign-in");
  }

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user.id),
    getLatestInterviews({ userId: user.id }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta animate-scale-in">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="animate-slide-up">Your Personal AI Voice Assistant & Interview Coach</h2>
          <p className="text-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
            Practice interviews, get instant feedback, or chat with your AI companion anytime
          </p>

          <div className="flex gap-4 max-sm:flex-col animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button asChild className="btn-primary max-sm:w-full hover:scale-105 transition-transform">
              <Link href="/interview">Start an Interview</Link>
            </Button>
            <Button asChild className="btn-secondary max-sm:w-full hover:scale-105 transition-transform">
              <Link href="/assistant">💬 Chat with Voice Assistant</Link>
            </Button>
          </div>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden animate-scale-in transition-transform hover:scale-105"
          style={{ animationDelay: '150ms' }}
        />
      </section>

      <section className="flex flex-col gap-6 mt-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview, index) => (
              <div 
                key={interview.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${400 + index * 50}ms` }}
              >
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          ) : (
            <p className="text-light-400">You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview, index) => (
              <div 
                key={interview.id}
                className="animate-slide-up"
                style={{ animationDelay: `${500 + index * 50}ms` }}
              >
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          ) : (
            <p className="text-light-400">There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
