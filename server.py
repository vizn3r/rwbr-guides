#!/usr/bin/env python3
"""
Simulates GitHub Pages hosting with SPA routing via custom 404.html.
- Serves static files normally.
- For any path that doesn't match a file, serves 404.html with a 404 status.
- GitHub Pages uses this exact mechanism: the custom 404.html redirects to /,
  and the SPA reads the saved path from sessionStorage.
"""

import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class GHPagesHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Dev: never cache, so edits to js/css/md/svg always show on reload.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        # If the path is exactly /404.html, serve it normally (status 200)
        if self.path == "/404.html":
            self.path = "/404.html"
            return super().do_GET()

        # Check if the requested path corresponds to an actual file (or a
        # directory with an index.html, e.g. the root "/").
        requested_file = self.translate_path(self.path)
        if os.path.isdir(requested_file):
            requested_file = os.path.join(requested_file, "index.html")
        if os.path.isfile(requested_file):
            # File exists – serve normally
            super().do_GET()
        else:
            # File not found – serve custom 404.html with 404 status
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            with open(os.path.join(DIRECTORY, "404.html"), "rb") as f:
                self.wfile.write(f.read())

if __name__ == "__main__":
    server = HTTPServer(("", PORT), GHPagesHandler)
    print(f"Simulating GitHub Pages on http://localhost:{PORT}")
    print("Press Ctrl+C to stop")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()