export default function Footer() {
  return (
    <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="/" class="hover:underline">
            L3-Gang
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
