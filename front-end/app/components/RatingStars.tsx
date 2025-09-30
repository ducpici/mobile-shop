import { Star } from "lucide-react";

type RatingProps = {
  rating: number;
};

const RatingStars = ({ rating }: RatingProps) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => {
        const starNumber = i + 1;
        const isFull = starNumber <= Math.floor(rating);
        const isHalf = starNumber === Math.ceil(rating) && !Number.isInteger(rating);

        return (
          <div key={i} className="relative">
            {/* Nền xám */}
            <Star className="h-5 w-5 text-gray-300" />

            {/* Sao vàng full */}
            {isFull && (
              <Star className="absolute top-0 left-0 h-5 w-5 fill-yellow-400 text-yellow-400" />
            )}

            {/* Sao vàng nửa */}
            {isHalf && (
              <Star className="absolute top-0 left-0 h-5 w-5 text-yellow-400">
                <mask id={`half-${i}`}>
                  <rect x="0" y="0" width="50%" height="100%" fill="white" />
                </mask>
              </Star>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
