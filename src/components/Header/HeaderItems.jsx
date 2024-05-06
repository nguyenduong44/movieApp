const items = [
  {
    label: 'HOME',
    active: true
  },
  {
    label: 'MOVIES',
    active: false
  },
  {
    label: 'TV SHOWS',
    active: false
  },
  {
    label: 'NOW PLAYING',
    active: false
  }
]

function HeaderItems() {
  return (
    <ul className="flex">
      {items.map((item, index) => {
        return (
          <li key={index} className={`text-[#FFF] font-medium relative ${item.active && 'underline underline-offset-8'}`}>
            {index !== 0 && <div className="absolute left-0 top-[6px] h-3/6 border-l border-white opacity-60" style={{width: '1px'}}></div>}
            <span className="px-9 cursor-pointer">{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default HeaderItems;