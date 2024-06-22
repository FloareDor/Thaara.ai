import Navbar from "@/components/navbar/navbar"
import HomeComponent from "@/components/home/home";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HomeComponent/>
    </div>
  )
}

export default Home;