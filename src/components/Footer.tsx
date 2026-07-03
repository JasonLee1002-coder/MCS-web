export default function Footer() {
  return (
    <footer className="bg-mcs-blue-dark text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <div className="text-white font-bold text-lg mb-1">MCS</div>
            <div className="text-sm">Meta Clearing Station Pte. Ltd.</div>
          </div>
          <div className="text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} Meta Clearing Station Pte. Ltd. All
            rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
