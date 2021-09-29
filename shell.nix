{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  name = "publish-action";
  buildInputs = with pkgs; [ act bashInteractive nodejs-12_x ];
}
