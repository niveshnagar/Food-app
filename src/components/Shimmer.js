import ShimmerCard from "./ShimmerCard";

const Shimmer = () => {
  const shimmerCardList = Array(15)
    .fill()
    .map((_, index) => <ShimmerCard key={"shimmer"+index} />);


  return (
    <main className="body">
      <section className="shimmer-container">
        {shimmerCardList.map((card, index)=>{
          return <ShimmerCard key={index}/>;
        })}
      </section>
    </main>
  );
};
export default Shimmer;