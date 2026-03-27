import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post/$id')({
  // Force a refetch on every navigation
  staleTime: 0,
  loader: async ({ params }) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    try {
      const res = await fetch(`${API_URL}/blog/${params.id}`);
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      return null;
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  // 3. Use the hook to actually get the data from the loader
  const post = Route.useLoaderData();
  const { id } = Route.useParams();

  if (!post) {
    return <div className="p-6">Post with ID {id} not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="mt-4 leading-loose">{post.content}</div>
    </div>
  )
}
