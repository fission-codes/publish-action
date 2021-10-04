let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs { };
in pkgs.mkShell {
  name = "publish-action";
  buildInputs = with pkgs; [ act bashInteractive nodejs-12_x ];
}
