'use client'
import { Camera, LogIn, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from 'framer-motion'
import { useSession, signOut } from "next-auth/react"
import { Button } from "~/components/ui/button"


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {data: session} = useSession()
    const MotionLink = motion(Link)

    return (
        <>
        <header className="fixed w-full z-10 bg-black/80 backdrop-blur-sm text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <MotionLink 
            href="/" 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">CaptureIt.</span>
          </MotionLink>
          <nav className="hidden md:flex space-x-4 items-center">
            <MotionLink 
              href="/posts" 
              className="hover:text-purple-400 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              All Posts
            </MotionLink>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {session ? (
                <Button variant="outline" size="sm" className="bg-purple-600 hover:bg-purple-700 border-none" onClick={()=> signOut()}>
                  Sign Out
                </Button>
              ) : (
              <Link href="api/auth/signin">
              <Button variant="outline" size="sm" className="bg-purple-600 hover:bg-purple-700 border-none">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              </Link>
              )}
            </motion.div>
          </nav>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>


      {isMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-black z-20 flex flex-col items-center justify-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MotionLink 
            href="/posts" 
            className="text-2xl hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(false)}
          >
            All Posts
          </MotionLink>
          {session ? (
              <Button variant="outline" size="lg" className="bg-purple-600 hover:bg-purple-700 border-none" onClick={() => {signOut(); setIsMenuOpen(false);}}>
               Sign Out
              </Button>
          ) : (
          <Button variant="outline" size="lg" onClick={() => setIsMenuOpen(false)} className="bg-purple-600 hover:bg-purple-700 border-none">
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </Button>
          )}
        </motion.div>
      )}
      </>

    )
}