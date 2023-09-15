import { prisma } from "@/libs/prisma";
import TaskCard from "@/components/TaskCard";
async function loadTasks() {
  // const res = await fetch("http://localhost:3000/api/tasks")
  // const data = await res.json();
  return await prisma.task.findMany()
}

// export const revalidate = 60;

export const dynamic = "force-dynamic";


export default async function Home() {
  const tasks = await loadTasks();
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}
<svg width="512" height="512" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" d="M18 18V7.132l-8-4.8l-8 4.8V18h4v-2.75a4 4 0 1 1 8 0V18h4zm-6 2v-4.75a2 2 0 1 0-4 0V20H2a2 2 0 0 1-2-2V7.132a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.132V18a2 2 0 0 1-2 2h-6z" />
</svg>