function Card({ 
  image, 
  title, 
  description, 
  children, 
  className = "", 
  onClick, 
  imageAlt = "card image", 
  titleTag = "h3" 
}) {
  const TitleTag = titleTag;
  return (
    <div 
      className={`flex flex-col rounded-lg bg-white border border-gray-200 p-5 text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${className}`} 
      onClick={onClick}
    >
      {image && (
        <div className="h-48 w-full flex items-center justify-center bg-gray-50 rounded-lg p-3 mb-4">
          <img src={image} alt={imageAlt} className="max-h-full max-w-full object-contain mix-blend-multiply" />
        </div>
      )}
      <div className="flex flex-col gap-1">
        {title && (
          <TitleTag className="text-base font-semibold text-gray-900">
            {title}
          </TitleTag>
        )}
        {description && (
          <p className="text-[14px] leading-relaxed text-gray-500">
            {description}
          </p>
        )}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
}

export default Card;

