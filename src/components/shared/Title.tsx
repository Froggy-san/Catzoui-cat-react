import { useSearchParams } from "react-router-dom";

const Title = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  const [searchParams] = useSearchParams();

  const value = searchParams.get("filter") || "Variety";

  return (
    <div className={className}>
      {value === "clothing"
        ? "Fashion"
        : value === "all"
        ? "Variety"
        : value || title}
    </div>
  );
};

export default Title;
