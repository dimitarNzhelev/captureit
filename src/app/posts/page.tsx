'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '~/components/ui/card';
import { Camera } from 'lucide-react';
import Image from 'next/image';

type Post = {
  id: string;
  name: string;
  createdById: string;
  imageURL: string;
  createdAt: Date;
  createdBy: {
    name: string;
  };
};

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/get');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
   void fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            All Posts
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="group"
            >
              <Link href="/posts/new">
                <Card className="bg-gray-900 overflow-hidden border-purple-500 border-opacity-0 group-hover:border-opacity-100 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-0 h-64 flex items-center justify-center text-white">
                    <Camera className="w-10 h-10 mr-2" />
                    <span className="text-xl">Create New Post</span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {posts.length > 0 ? (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="group"
                >
                  <Card className="bg-gray-900 overflow-hidden border-purple-500 border-opacity-0 group-hover:border-opacity-100 transition-all duration-300">
                    <CardContent className="p-0 relative">
                    <img
                        src={post.imageURL}
                        alt={post.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center mb-2">
                          <p className="text-sm text-purple-300">@{post.createdBy.name}</p>
                        </div>
                        <p className="mt-2 text-white">{post.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-400 mt-8 col-span-full">No posts available. Start by creating one!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}