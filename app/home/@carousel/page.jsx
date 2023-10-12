
const DATA = [
  {
    coverImageUri: 'https://user-images.githubusercontent.com/6414178/73920321-2357b680-4900-11ea-89d5-2e8cbecec9f6.jpg',
  },
  {
    coverImageUri: 'https://user-images.githubusercontent.com/6414178/73920358-336f9600-4900-11ea-8eec-cc919b991e90.jpg',
  },
  {
    coverImageUri: 'https://user-images.githubusercontent.com/6414178/73927874-25744200-490d-11ea-940f-db3e5dbd8b2b.jpg',
  },
  {
    coverImageUri: 'https://user-images.githubusercontent.com/6414178/73920399-45e9cf80-4900-11ea-9d5b-743fe5e8b9a4.jpg',
  },
];

export default function page() {
  return (
    <main className="space-x-2">
      <div className=" flex justify-start items-center overflow-hidden py-14 overflow-x-scroll  no-scrollbar  snap-x snap-mandatory ">
        {DATA.map((item, index) =>
          <div key={index} style={{ backgroundImage: `url(${item.coverImageUri})` }} className="aspect-[16/9] shadow-xl shadow-gray-400 mx-4 min-w-[calc(100vw_-_40px)]  object-cover object-center bg-cover rounded-lg overflow-hidden snap-center" />
        )}
      </div>
    </main>

  )
}
